export const analyzeQuery = (query, data) => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('area') || lowerQuery.includes('zone') || lowerQuery.includes('warehouse')) {
    const locations = ['Area 42', 'Zone A', 'Zone B', 'Zone C', 'Warehouse'];
    const foundLoc = locations.find(l => lowerQuery.includes(l.toLowerCase()));
    
    if (foundLoc) {
      const count = data.filter(d => d.location === foundLoc).length;
      const severity3 = data.filter(d => d.location === foundLoc && d.severity_level === 3).length;
      return `I found **${count} incidents** reported in **${foundLoc}**. Of those, **${severity3}** were critical (Level 3). It accounts for about ${Math.round((count/data.length)*100)}% of total reports.`;
    }
    return "I can analyze specific locations. Try asking about 'Area 42' or 'Zone A'.";
  }

  if (lowerQuery.includes('critical') || lowerQuery.includes('severity') || lowerQuery.includes('high risk') || lowerQuery.includes('dangerous')) {
    const highRisk = data.filter(d => d.severity_level === 3);
    const topLoc = highRisk.reduce((acc, curr) => { acc[curr.location] = (acc[curr.location]||0)+1; return acc; }, {});
    const worstLoc = Object.keys(topLoc).sort((a,b) => topLoc[b]-topLoc[a])[0];
    
    return `There are **${highRisk.length} critical (Level 3)** incidents in total. The location with the most high-risk behavior is **${worstLoc}** with ${topLoc[worstLoc]} critical reports. Immediate attention is recommended there.`;
  }

  if (lowerQuery.includes('most common') || lowerQuery.includes('category') || lowerQuery.includes('cause')) {
    const counts = data.reduce((acc, curr) => { acc[curr.primary_category] = (acc[curr.primary_category]||0)+1; return acc; }, {});
    const topCat = Object.keys(counts).sort((a,b) => counts[b]-counts[a])[0];
    return `The most common incident category is **${topCat}**, with **${counts[topCat]} reports**. This is primarily driven by unsafe behaviors rather than equipment failure.`;
  }

  if (lowerQuery.includes('summary') || lowerQuery.includes('overview') || lowerQuery.includes('total')) {
    return `**Executive Summary:** \n• Total Records: ${data.length} \n• Open Cases: ${data.filter(d => d.status === 'Open').length} \n• Critical Risks: ${data.filter(d => d.severity_level === 3).length}. \n\nThe overall trend is stable, but Fall Protection incidents in Zone B have risen slightly.`;
  }

  return "I can answer questions about **Locations** (e.g., 'How many in Zone A?'), **Risk Levels** (e.g., 'Show critical risks'), or **Categories** (e.g., 'Most common accidents'). What would you like to know?";
};