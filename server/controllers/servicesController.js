import ServicesService from "../services/servicesService.js";
const servicesService = new ServicesService();

class ServicesController {
  async CreateService(req, res, next) {
    try {
      const { service_name, description, price, service_group_id } = req.body;
      await servicesService.createService(
        service_name,
        description,
        price,
        service_group_id
      );
      return res.json("Услуга успешно создана");
    } catch (e) {
      next(e);
    }
  }

  async EditService(req, res, next) {
    try {
      const { service_id, service_name, description, price, service_group_id } =
        req.body;
      await servicesService.editService(
        service_id,
        service_name,
        description,
        price,
        service_group_id
      );
      return res.json("Услуга успешно изменена");
    } catch (e) {
      next(e);
    }
  }

  async DeleteService(req, res, next) {
    try {
      const { id } = req.params;
      await servicesService.deleteService(id);
      return res.json("Услуга успешно удалена");
    } catch (e) {
      next(e);
    }
  }

  async GetServices(req, res, next) {
    try {
      const response = await servicesService.getServices();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }

  async GetServicesGroup(req, res, next) {
    try {
      const response = await servicesService.getServicesGroup();
      return res.json(response.rows);
    } catch (e) {
      next(e);
    }
  }
}

export default ServicesController;
