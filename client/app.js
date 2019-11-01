const getChirps = () => {
    $.ajax({
            url: '/api/chirps',
            method: 'GET'
        })
        .then(chirps => displayChirps(chirps))
}

const displayChirps = (chirps) => {
    let chirpsArray = Object.keys(chirps).map(key => {
        return {
            id: key,
            name: chirps[key].name,
            message: chirps[key].message
        };
    });
    console.log(chirpsArray);

    chirpsArray.pop();

    $('#cards').empty();

    chirpsArray.forEach(chirp => {
        $('#cards').append(`
            <div class="col-md-7 text-center">
                <div class="card my-2 shadow">
                    <div class="card message-center">
                        <h4 class="card-title mt-3">${chirp.name} said:</h4>
                            <p class="card-message">${chirp.message}</p>

                            <button onClick="editChirp(${chirp.id},'${chirp.name}', '${chirp.message}')" id="editChirp" type="button"
                            class="btn btn-outline-info w-20 mx-auto mb-3 btn-sm">Edit Chirp</button>

                            <button onClick="deleteChirp(${chirp.id})" id="deleteChirp" type="button"
                            class="btn btn-outline-info w-20 mx-auto mb-3 btn-sm">Delete Chirp</button> 
                            
                    </div>
                </div>
            </div>
        `);
    })
}

const deleteChirp = (id) => {
    $.ajax({
            type: "DELETE",
            url: `/api/chirps/${id}`
        })
        .then(chirps => displayChirps(chirps));
};

const editChirp = (id, name, message) => {
    Swal.fire({
        title: `Edit Chirp ${id}`,
        input: 'text',
        inputValue: message,
        showCancelButton: true,
        confirmButtonText: 'Save',
        preConfirm: (editedMessage) => {
            updateChirp(id,name,editedMessage)
        }
    })
}

const updateChirp = (id, name, message) => {
    $.ajax({
        type: "PUT",
        url: `/api/chirps/${id}`,  
        data: {name, message}
    })
    .then(chirps => displayChirps(chirps))
};

getChirps();

$('#chirpSubmit').click(() => {
    event.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/api/chirps',
        data: {
            name: $('[name="name"]').val(),
            message: $('[name="message"').val(),
        }
    }).then(() => {
        $('[name="name"]').val('');
        $('[name="message"]').val('');
        getChirps();
    })
});




