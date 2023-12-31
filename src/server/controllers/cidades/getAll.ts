import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { cidadesProvider } from "../../database/providers/cidades";

interface IQueryProps {
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        id: yup.number().integer().optional().default(0),
        page: yup.number().optional().moreThan(0).default(1),
        limit: yup.number().optional().moreThan(0).default(1),
        filter: yup.string().optional().default(""),
    })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const result = await cidadesProvider.getAll(
        req.query.page || 1,
        req.query.limit || 10,
        req.query.filter || "",
        (Number(req.query.id) || 0)
    );
    const count = await cidadesProvider.count(req.query.filter);

    console.log("idUsuario", req.headers.idUsuario);

    if (result instanceof Error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: result.message
            }
        });
    } else if ( count instanceof Error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: count.message
            }
        });
    }

    res.setHeader("access-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", count);
    
    return res.status(StatusCodes.OK).json(result);
};
