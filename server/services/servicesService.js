import client from "../db.js";

class ServicesService {
  async createService(service_name, description, price, service_group_id) {
    await client.query(
      `insert into services (service_name, description, price, service_group_id) 
                values ($1, $2, $3, $4)`,
      [service_name, description, price, service_group_id]
    );
  }

  async editService(
    service_id,
    service_name,
    description,
    price,
    service_group_id
  ) {
    await client.query(
      `update services set 
      service_name = $1, description = $2, price = $3, service_group_id = $4
         where service_id = $5`,
      [service_name, description, price, service_group_id, service_id]
    );
  }

  async deleteService(service_id) {
    await client.query(`delete from services where service_id = $1`, [
      service_id,
    ]);
  }

  async getServices() {
    const response = await client.query(`SELECT 
    s.service_id,
    s.service_name,
    s.price,
    s.description,
    s.service_group_id,
    sg.service_group
FROM 
    services AS s
JOIN 
    service_group AS sg ON s.service_group_id = sg.service_group_id
    order by s.service_id asc`);
    return response;
  }

  async getServicesGroup() {
    const response = await client.query(`SELECT * FROM service_group`);
    return response;
  }
}

export default ServicesService;
