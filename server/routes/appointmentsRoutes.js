import Router from "express";
import AppointmentsController from "../controllers/appointmentsController.js";

const appointmentsController = new AppointmentsController();
const appointmentsRouter = new Router();

appointmentsRouter.post(
  "/createAppointment",
  appointmentsController.CreateAppointment
);
appointmentsRouter.put(
  "/editAppointment",
  appointmentsController.EditAppointment
);
appointmentsRouter.put(
  "/editStatusAppointment",
  appointmentsController.EditStatusAppointment
);
appointmentsRouter.delete(
  "/deleteAppointment/:id",
  appointmentsController.DeleteAppointment
);
appointmentsRouter.get(
  "/getAppointments",
  appointmentsController.GetAppointments
);
appointmentsRouter.get(
  "/getAppointmentsUser/:id",
  appointmentsController.GetAppointmentsUser
);
appointmentsRouter.get(
  "/getAppointmentsStatus",
  appointmentsController.GetAppointmentsStatus
);

export default appointmentsRouter;
