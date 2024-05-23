import MasterService from "../services/masterService.js";
const masterService = new MasterService();

class MasterController {
  async EditMasterWorking(req, res, next) {
    try {
      const { work_days, work_time } = req.body;
      console.log("ok");
      await masterService.editMasterWorking(work_days, work_time);
      return res.json("Данные мастера успешно изменены");
    } catch (e) {
      next(e);
    }
  }

  async GetMasters(req, res, next) {
    try {
      const response = await masterService.getMasters();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }

  async DeletePreviousDates(req, res, next) {
    try {
      await masterService.deletePreviousDates();
      return res.json("Запись успешно удалена");
    } catch (e) {
      next(e);
    }
  }
}

export default MasterController;
