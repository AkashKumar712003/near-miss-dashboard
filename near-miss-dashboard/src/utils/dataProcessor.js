export const processData = (rawData) => {
  if (!rawData || !Array.isArray(rawData)) return null;

  const cleanData = rawData.map(item => ({
    ...item,
    id: item._id?.$oid || item.id || Math.random().toString(),
    incidentDate: item.incident_date ? new Date(item.incident_date) : null,
    category: item.primary_category || "Uncategorized",
    severity: item.severity_level || 0,
    behaviorType: item.behavior_type || "Unknown",
    location: item.location || "Unknown",
    type: item.unsafe_condition_or_behavior || "Other"
  })).filter(item => item.incidentDate !== null); 

  const categoryCounts = cleanData.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});
  const categoryData = Object.keys(categoryCounts)
    .map(key => ({ name: key, count: categoryCounts[key] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); 

  const timelineCounts = cleanData.reduce((acc, curr) => {
    const dateKey = curr.incidentDate.toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {});
  const trendData = Object.keys(timelineCounts).map(key => ({
    date: key,
    incidents: timelineCounts[key]
  }));

  const severityCounts = cleanData.reduce((acc, curr) => {
    const level = `Level ${curr.severity}`;
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});
  const severityData = Object.keys(severityCounts).map(key => ({
    name: key,
    value: severityCounts[key]
  }));

  const typeCounts = cleanData.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {});
  const typeData = Object.keys(typeCounts).map(key => ({
    name: key,
    value: typeCounts[key]
  }));

  const locationCounts = cleanData.reduce((acc, curr) => {
    acc[curr.location] = (acc[curr.location] || 0) + 1;
    return acc;
  }, {});
  const locationData = Object.keys(locationCounts)
    .map(key => ({ name: key, count: locationCounts[key] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalRecords: cleanData.length,
    categoryData,
    trendData,
    severityData,
    typeData,
    locationData,
    recentIncidents: cleanData.slice(0, 5)
  };
};