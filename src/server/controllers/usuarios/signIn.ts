import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middleware";
import { usuariosProvider } from "../../database/providers/usuarios";
import { IUsuario } from "../../database/models";
import { passwordCrypto } from "../../shared/services";
import { JWTService } from "../../shared/services/JWTService";

interface IBodyProps extends Omit<IUsuario, "id" | "nome"> {}

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email().min(6),
        senha: yup.string().required().min(6),
    })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const { email, senha } = req.body;

    const usuario = await usuariosProvider.getByEmail(email);
    if (usuario instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Email ou senha inválidos"
            }
        });
    }

    const passwordMatch = await passwordCrypto.verifyPasswords(senha, usuario.senha);
    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Email ou senha inválidos"
            }
        });
    } else {
        const accessToken = JWTService.sign({ uid: usuario.id});

        if (accessToken === "JWT_SECRET_NOT_FOUND") {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: "Erro ao gerar o token de acesso"
                }
            });
        }

        return res.status(StatusCodes.OK).json({ accessToken });
    }
};
