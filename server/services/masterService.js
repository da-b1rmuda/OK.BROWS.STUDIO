import client from "../db.js";

class MasterService {
  async editMasterWorking(work_days, work_time) {
    await client.query(
      `update master set 
      work_days = $1, work_time = $2
         where master_id = '3582ad91-5325-4406-85c3-09e8b6aab7ac'`,
      [work_days, work_time]
    );
  }

  async getMasters() {
    const response = await client.query(`select * from master`);
    return response;
  }

  async deletePreviousDates() {
    const currentDate = new Date().toISOString().split("T")[0];
    const response = await client.query(`select work_days from master`);
    const workDaysArray = response.rows[0].work_days;
    const filteredWorkDays = workDaysArray.filter(
      (date) => date >= currentDate
    );
    await client.query(`update master set work_days = $1`, [filteredWorkDays]);
  }
}

export default MasterService;
