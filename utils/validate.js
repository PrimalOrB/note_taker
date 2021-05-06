  function validate( check ) {
    // Convert values to object, and ensure each is not null, or not empty. Return is true/false
    check = Object.values(check).some( x => (x !== null && x !== '' ) )
    return check;
  }

  module.exports = validate