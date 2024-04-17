export function convertServicesObject(services) {
  if (!Array.isArray(services) || services.length === 0) {
    return [];
  }

  const groupedServices = services.reduce((acc, service) => {
    acc[service.service_group] = acc[service.service_group] || [];
    acc[service.service_group].push(service);
    return acc;
  }, {});

  return Object.keys(groupedServices).map((title) => ({
    title,
    items: groupedServices[title].map(
      ({ service_name, price, description }) => ({
        item: service_name,
        price,
        description: description || null,
      })
    ),
  }));
}
