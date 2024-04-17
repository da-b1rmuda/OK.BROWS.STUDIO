import Router from "express";
import ServicesController from "../controllers/servicesController.js";

const servicesController = new ServicesController();
const servicesRouter = new Router();

servicesRouter.post("/createService", servicesController.CreateService);
servicesRouter.put("/editService", servicesController.EditService);
servicesRouter.get("/getServices", servicesController.GetServices);
servicesRouter.get("/getServicesGroup", servicesController.GetServicesGroup);
servicesRouter.delete("/deleteService/:id", servicesController.DeleteService);

export default servicesRouter;
