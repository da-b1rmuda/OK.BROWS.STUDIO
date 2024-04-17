import AppointmentsService from "../services/appointmentsService.js";
const appointmentsService = new AppointmentsService();

class AppointmentsController {
  async CreateAppointment(req, res, next) {
    try {
      const { service_id, client_id, appointment_date, appointment_time } =
        req.body;
      await appointmentsService.createAppointment(
        service_id,
        client_id,
        appointment_date,
        appointment_time
      );
      return res.json("Вы успешно записались");
    } catch (e) {
      next(e);
    }
  }

  async EditAppointment(req, res, next) {
    try {
      const { appointment_id, service_id, appointment_date, appointment_time } =
        req.body;
      await appointmentsService.editAppointment(
        appointment_id,
        service_id,
        appointment_date,
        appointment_time
      );
      return res.json("Запись успешно изменена");
    } catch (e) {
      next(e);
    }
  }

  async EditStatusAppointment(req, res, next) {
    try {
      const { appointment_id } = req.body;
      await appointmentsService.editStatusAppointment(appointment_id);
      return res.json("Статус записи успешно изменен");
    } catch (e) {
      next(e);
    }
  }

  async DeleteAppointment(req, res, next) {
    try {
      const { id } = req.params;
      await appointmentsService.deleteAppointment(id);
      return res.json("Запись успешно удалена");
    } catch (e) {
      next(e);
    }
  }

  async GetAppointments(req, res, next) {
    try {
      const response = await appointmentsService.getAppointments();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }

  async GetAppointmentsUser(req, res, next) {
    try {
      const { id } = req.params;
      const response = await appointmentsService.getAppointmentsUser(id);
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }

  async GetAppointmentsStatus(req, res, next) {
    try {
      const response = await appointmentsService.getAppointmentsStatus();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
}

export default AppointmentsController;
