import client from "../db.js";
import MailService from "./mailService.js";

const mailService = new MailService();

class AppointmentsService {
  async createAppointment(
    service_id,
    client_id,
    appointment_date,
    appointment_time
  ) {
    console.log(service_id, client_id, appointment_date, appointment_time);
    await client.query(
      `insert into appointments (
        service_id,
        client_id,
        appointment_date,
        appointment_time
      ) 
      values ($1, $2, $3, $4)`,
      [service_id, client_id, appointment_date, appointment_time]
    );
  }

  async editAppointment(
    appointment_id,
    service_id,
    appointment_date,
    appointment_time
  ) {
    console.log(appointment_id, service_id, appointment_date, appointment_time);
    await client.query(
      `update appointments set 
      appointment_time = $1, service_id = $2, appointment_date = $3
        where appointment_id = $4`,
      [appointment_time, service_id, appointment_date, appointment_id]
    );
    const response = await client.query(
      `select a.appointment_date, a.appointment_time, s.service_name, s.price, u.user_name, u.user_email
from appointments as a 
inner join services as s on a.service_id = s.service_id
inner join appointment_status as ast on a.status_id = ast.status_id
inner join users as u on a.client_id = u.user_id
where a.appointment_id = $1`,
      [appointment_id]
    );
    await mailService.sendChangeBooking(response.rows[0]);
  }

  async editStatusAppointment(appointment_id) {
    await client.query(
      `update appointments set 
       status_id = 'ce003e07-5888-4df5-85ce-9597b161907e'
        where appointment_id = $1`,
      [appointment_id]
    );
    const response = await client.query(
      `select a.appointment_date, a.appointment_time, s.service_name, s.price, u.user_name, u.user_email
from appointments as a 
inner join services as s on a.service_id = s.service_id
inner join appointment_status as ast on a.status_id = ast.status_id
inner join users as u on a.client_id = u.user_id
where a.appointment_id = $1`,
      [appointment_id]
    );
    await mailService.sendSuccessfulBooking(response.rows[0]);
  }

  async deleteAppointment(appointment_id) {
    const response = await client.query(
      `select u.user_email
from appointments as a 
inner join appointment_status as ast on a.status_id = ast.status_id
inner join users as u on a.client_id = u.user_id
where a.appointment_id = $1`,
      [appointment_id]
    );
    await mailService.sendDeleteBooking(response.rows[0]?.user_email);
    await client.query(`delete from appointments where appointment_id = $1`, [
      appointment_id,
    ]);
  }

  async getAppointments() {
    const response =
      await client.query(`select a.appointment_id, a.appointment_date, a.appointment_time, s.service_name, s.price, 
    ast.status, u.user_id, u.user_name, a.service_id
from appointments as a 
inner join services as s on a.service_id = s.service_id
inner join appointment_status as ast on a.status_id = ast.status_id
inner join users as u on a.client_id = u.user_id
order by a.appointment_date desc`);
    return response;
  }

  async getAppointmentsUser(id) {
    const response = await client.query(
      `select a.appointment_date, a.appointment_time, s.service_name, s.price from appointments as a 
      inner join services as s on a.service_id = s.service_id where client_id = $1`,
      [id]
    );
    return response;
  }

  async getAppointmentsStatus() {
    const response = await client.query(`select * from appointment_status`);
    return response;
  }
}

export default AppointmentsService;
