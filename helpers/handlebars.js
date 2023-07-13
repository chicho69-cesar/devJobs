const selectSkills = (selecteds = [], options) => {
  const skills = [
    'HTML5', 'CSS3', 'CSSGrid', 'Flexbox', 'JavaScript', 
    'jQuery', 'Node', 'Angular', 'VueJS', 'ReactJS', 
    'React Hooks', 'Redux', 'Apollo', 'GraphQL', 
    'TypeScript', 'PHP', 'Laravel', 'Symfony', 'Python', 
    'Django', 'ORM', 'Sequelize', 'Mongoose', 'SQL', 
    'MVC', 'SASS', 'WordPress'
  ]

  let html = ''

  skills.forEach(skill => {
    html += `
      <li ${selecteds.includes(skill) ? ' class="active"' : ''}>${skill}</li>
    `
  })

  return options.fn().html = html
}

const typeOfContract = (selected, options) => {
  return options.fn(this).replace(
    new RegExp(` value="${selected}"`), '$& selected="selected"'
  )
}

const showAlerts = (errors = {}, alerts) => {
  const category = Object.keys(errors)
  let html = ''

  if (category.length) {
    errors[category].forEach(error => {
      html += `<div class="${category} alert">
        ${error}
      </div>`
    })
  }

  return alerts.fn().html = html
}

module.exports = {
  selectSkills,
  typeOfContract,
  showAlerts
}
