// Transforms the Client Data being read from JSON to be compatible with Graph Schema.

export const readClientInfo = (clients) => {
  const industries = ['Financial', 'Manufacturing', 'Technology', 'Commercial'];
  const securityTypes = ['Government', 'Corporate'];
  const maturities = ['Short', 'Mid', 'Shortlong', 'Long'];
  // Check Client maturity/industry/secType - if in array -> get index+1

  let fixedClients = clients.map((value, index) => {
    let client = { name: null, axes: [] };

    client.name = `Client ${index + 1}`;

    let industry =
      industries.indexOf(value.Industry) !== -1
        ? industries.indexOf(value.Industry) + 1
        : 0;
    let spRating = parseInt(value.SPRating);
    let riRating = parseInt(value.RIRating);
    let moodyRating = parseInt(value.MoodyRating);
    let jcrRating = parseInt(value.JCRRating);
    let maturity = maturities.indexOf(value.Maturity) + 1;
    let securityType = securityTypes.indexOf(value.SecurityType) + 1;

    client.axes = [
      { axis: 'Sec. Type', value: securityType },
      { axis: 'S&P Rating', value: generateScale(0, 4, spRating) },
      { axis: 'R&I Rating', value: generateScale(0, 4, riRating) },
      { axis: 'Moodys Rating', value: generateScale(0, 4, moodyRating) },
      { axis: 'JCR Rating', value: generateScale(0, 4, jcrRating) },
      { axis: 'Maturity', value: maturity },
      { axis: 'Industry', value: industry },
    ];

    return client;
  });

  return fixedClients;
};

const generateScale = (newMin, newMax, number) => {
  let offset = newMin - 0;
  let scale = (newMax - newMin) / (10 - 0);
  return offset + scale * number;
};
