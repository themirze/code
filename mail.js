function() {
  var formId = {{dLv - formId}} || ''; 
  var formInputs = {{dLv - inputs}};

  if (!formInputs) {
    return undefined;
  }

  var whatsappFormIds = ['6930', '7208', '8309'];
  var emailOnlyFormIds = ['7214', '4793', '1066', '7211', '4284', '770'];

  var searchMode = 'default';
  if (whatsappFormIds.indexOf(formId.toString()) > -1) {
    searchMode = 'phone_only'; // Sadece telefon ara
  } else if (emailOnlyFormIds.indexOf(formId.toString()) > -1) {
    searchMode = 'email_only'; // Sadece email ara
  }

  var foundEmail = null;
  var foundPhone = null;

  for (var key in formInputs) {
    if (formInputs.hasOwnProperty(key)) {
      var value = formInputs[key];

      if (searchMode !== 'phone_only' && typeof value === 'string' && value.includes('@')) {
        foundEmail = value.toLowerCase().trim();
        break;
      }
    
      if (searchMode !== 'email_only' && !foundEmail && typeof value === 'string' && /^\+?[0-9\s\-\(\)]{10,}$/.test(value)) {
        
        var cleanedPhone = value.replace(/[\s\-\(\)]/g, '');

        if (cleanedPhone.startsWith('+')) {
            foundPhone = cleanedPhone;
        } else {
            cleanedPhone = cleanedPhone.replace(/[^0-9]/g, '');
            foundPhone = '+' + cleanedPhone;
        }

        if (searchMode === 'phone_only') {
          break;
        }
      }
    }
  }

  if (foundEmail) {
    return {
      'email': foundEmail
    };
  } else if (foundPhone) {
    return {
      'phone_number': foundPhone
    };
  }

  return undefined;
}
