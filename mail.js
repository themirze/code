function() {
  var formInputs = {{DLV - inputs}};

  if (!formInputs) {
    return undefined;
  }

  var foundEmail = null;
  var foundPhone = null;
  for (var key in formInputs) {
    if (formInputs.hasOwnProperty(key)) {
      var value = formInputs[key];

      // check there is mail or not
      if (typeof value === 'string' && value.includes('@')) {
        foundEmail = value.toLowerCase().trim();
      }
      
      // check there is phone or not
      if (typeof value === 'string' && /^[0-9\s\-\+\(\)]+$/.test(value) && value.length >= 10) {
        var rawPhone = value.replace(/[^0-9]/g, '');
        // E.164 formatted
        if (rawPhone.length >= 10 && !rawPhone.startsWith('90')) {
           foundPhone = '+90' + rawPhone.slice(-10);
        } else if (rawPhone.startsWith('90')) {
           foundPhone = '+' + rawPhone;
        }
      }
    }
  }
  
  if (foundEmail) {
    return {
      'email': foundEmail
    };
  }

  else if (foundPhone) {
    return {
      'phone_number': foundPhone
    };
  }

  // Hiçbir şey bulunamazsa tanımsız döndür.
  return undefined;
}
