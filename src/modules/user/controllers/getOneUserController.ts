import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import { NOT_FOUND_CODE_404, SERVER_ERROR_CODE_500, SUCCESS_CODE_200 } from "common/constants/HTTP_CODE";
import { UserModel } from "@common/models/UserModel";

export const getOneUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id  } = req.params;
    const user = await UserModel.findOne({where: {id}});
    if (!user) return ApiResponse(res,NOT_FOUND_CODE_404,false, "user not found");
    return ApiResponse(res,SUCCESS_CODE_200,true,"User found",user);
  } catch (error) {
    return ApiResponse(res,SERVER_ERROR_CODE_500,false, "Server error")

  }

};
