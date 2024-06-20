import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "common/helpers/ApiResponse";
import { NOT_FOUND_CODE_404, SERVER_ERROR_CODE_500, SUCCESS_CODE_200 } from "common/constants/HTTP_CODE";
import { UserModel } from "@common/models/UserModel";

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id  } = req.params;
    const user = await UserModel.findByPk(id);
    if (!user) return ApiResponse(res,NOT_FOUND_CODE_404,false, "User not found");
    await UserModel.destroy({where: {id}});
    return ApiResponse(res,SUCCESS_CODE_200,true,"User removed successfully id: "+id);
  } catch (error) {
    return ApiResponse(res,SERVER_ERROR_CODE_500,false, "Server error")

  }

};
