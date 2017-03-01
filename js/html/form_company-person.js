const html = `
<form>
  <input type="radio" id="type_person" name="type" value="person" checked/>
  <input type="radio" id="type_company" name="type" value="company"/>
  <input type="text" id="first_name" name="first_name" value="John"/>
  <input type="text" id="last_name" name="last_name" value="Doe"/>
  <input type="text" id="email" name="email" value="john@example.com"/>
  <input type="text" id="company_name" name="company_name" value=""/>
  <input type="text" id="phone" name="phone" value="234-567-890"/>
</form>
`
const RADIO = {
  PERSON_ID: 'type_person',
  COMPANY_ID: 'type_company'
}

const INPUT = {
  FIRST_NAME_ID: 'first_name',
  LAST_NAME_ID: 'last_name',
  EMAIL_ID: 'email',
  COMPANY_NAME_ID: 'company_name',
  PHONE_ID: 'phone'
}

function getElem (id) {
  return document.getElementById(id)
}

function checkForValidChars (str, regexp) {
  return new RegExp(regexp).test(str)
}
const elems = {
  getPersonRadioVal () {
    return getElem(RADIO.PERSON_ID).checked
  },
  getCompanyRadioVal () {
    return getElem(RADIO.COMPANY_ID).checked
  },
  getFirstName () {
    return getElem(INPUT.FIRST_NAME_ID).value
  },
  isFirstNameValid () {
    const val = this.getFirstName()
    return !!val && val !== '' && val !== ' '
  },
  getLastName () {
    return getElem(INPUT.LAST_NAME_ID).value
  },
  isLastNameValid () {
    const val = this.getLastName()
    return !!val && val !== '' && val !== ' '
  },
  getEmail () {
    return getElem(INPUT.EMAIL_ID).value
  },
  isEmailValid () {
    const val = this.getEmail()
    if (!val) return false

    return (/^[a-zA-Z0-9.]{1,64}@[a-zA-Z0-9.]{1,64}$/).test('asd@dsd.ee')
  },
  getCompanyName () {
    return getElem(INPUT.COMPANY_NAME_ID).value
  },
  isCompanyNameValid () {
    const val = this.getCompanyName()
    return !!val
  },
  getPhone () {
    return getElem(INPUT.PHONE_ID).value
  },
  isPhoneValid () {
    const val = this.getPhone()
    if (!val) return false

    const validCharRegexp = /^[\d\- ]*$/
    if (!checkForValidChars(val, validCharRegexp)) return false

    const minLength = 6
    const digitsOnly = val.match(/\d*/).join('')
    return digitsOnly.length >= minLength
  }
}

function isPerson () {
  return !!(elems.getPersonRadioVal())
}

function isCompany () {
  return !!(elems.getCompanyRadioVal())
}

function isPersonValid () {
  return elems.isFirstNameValid() &&
    elems.isLastNameValid() &&
    elems.isEmailValid()
}
function isCompanyValid () {
  return elems.isCompanyNameValid() &&
    elems.isPhoneValid()
}

function solution () {
  if (isPerson()) return isPersonValid()
  if (isCompany()) return isCompanyValid()
  return false
}

