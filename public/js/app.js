const axios = require('axios')
const Swal = require('sweetalert2')

document.addEventListener('DOMContentLoaded', () => {
  const skills = document.querySelector('.knowledge-list') // lista-conocimientos

  // Limpiar las alertas
  let alerts = document.querySelector('.alerts')

  if (alerts) {
    cleanAlerts()
  }

  if (skills) {
    skills.addEventListener('click', addSkills)
    // una vez que estamos en editar, llamar la función
    selectedSkills()
  }

  const vacanciesList = document.querySelector('.admin-dashboard') // panel-administracion

  if (vacanciesList) {
    vacanciesList.addEventListener('click', actionsList)
  }
})

const skills = new Set()

const addSkills = e => {
  if (e.target.tagName === 'LI') {
    if (e.target.classList.contains('active')) {
      // quitarlo del set y quitar la clase
      skills.delete(e.target.textContent)
      e.target.classList.remove('active')
    } else {
      // agregarlo al set y agregar la clase
      skills.add(e.target.textContent)
      e.target.classList.add('active')
    }
  }

  const skillsArray = [...skills]
  document.querySelector('#skills').value = skillsArray
}

const selectedSkills = () => {
  const selecteds = Array.from(document.querySelectorAll('.knowledge-list .active'))

  selecteds.forEach(selected => {
    skills.add(selected.textContent)
  })

  // inyectarlo en el hidden
  const skillsArray = [...skills]
  document.querySelector('#skills').value = skillsArray
}

const cleanAlerts = () => {
  const alerts = document.querySelector('.alerts')

  const interval = setInterval(() => {
    if (alerts.children.length > 0) {
      alerts.removeChild(alerts.children[0])
    } else if (alerts.children.length === 0) {
      alerts.parentElement.removeChild(alerts)
      clearInterval(interval)
    }
  }, 2000)
}

// Eliminar vacantes
const actionsList = e => {
  e.preventDefault()

  if (e.target.dataset.delete) {
    // eliminar por axios
    Swal.fire({
      title: '¿Confirmar Eliminación?',
      text: "Una vez eliminada, no se puede recuperar",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        // enviar la petición con axios
        const url = `${location.origin}/vacancies/delete/${e.target.dataset.delete}`

        // Axios para eliminar el registro
        axios.delete(url, { params: { url } })
          .then(function (response) {
            if (response.status === 200) {
              Swal.fire(
                'Eliminado',
                response.data,
                'success'
              )

              //Eliminar del DOM
              e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement)
            }
          })
          .catch(() => {
            Swal.fire({
              type: 'error',
              title: 'Hubo un error',
              text: 'No Se pudo eliminar'
            })
          })
      }
    })
  } else if (e.target.tagName === 'A') {
    window.location.href = e.target.href
  }
}
