import Axios from 'axios';

const endPoints = {
    notes : 'http://localhost:8080/notes'
}

const services = {
    fetchAllNotes: function () {
        return Axios.get(endPoints.notes)
    },
    saveNote: function (data) {
        return Axios.post(endPoints.notes, {
            data
        })
    },
    deleteNote: function (id) {
        return Axios.delete(
          `${endPoints.notes}`,
          {params: {id}}

        )
    }
}

export default services;