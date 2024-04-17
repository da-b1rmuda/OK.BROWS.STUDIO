import Router from "express";
import MasterController from "../controllers/masterController.js";

const masterController = new MasterController();
const masterRouter = new Router();

masterRouter.put("/editMasterWorking", masterController.EditMasterWorking);
masterRouter.get("/getMasters", masterController.GetMasters);
masterRouter.put("/deletePreviousDates", masterController.DeletePreviousDates);

export default masterRouter;
