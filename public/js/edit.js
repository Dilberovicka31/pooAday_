//add functionality to edit bm's
//add functionality to delete bm's
const editBms = async (event) => {
    event.preventDefault();
    const date = $("#datepicker").val();
    const time = $("#timepicker").val();
    const style = $("#styleRange").val();
    const amount = $("#amountRange").val();
    const speed = $("#speedRange").val();
    const comfort = $(".comfort:checked").val();
    const bm = { date, time, style, amount, speed, comfort };
    const id = $(event.target).attr("data-id");
    $.ajax({

        method: "PUT",
        url: `/api/bm/${id}`,
        data: bm,
    }).then((res) => {
        window.location.replace("/myentry");
    });
};

const deleteBms = async (event) => {
    event.preventDefault();
    const id = $(event.target).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/api/bm/" + id,
    }).then(() => {
        window.location.replace("/myentry");
    });
}

$("#BM-edit-btn").on("click", editBms);
$("#BM-delete-btn").on("click", deleteBms);
//edit wellness entry
const editWellness = async (event) => {
    event.preventDefault();
    const date = $("#datepicker").val();
    const time = $("#timepicker").val();
    const sleep = $("#sleepRange").val();
    const stress = $("#stressRange").val();
    const energy = $("#energyRange").val();
    const wellness = { date, time, sleep, stress, energy };
    const id = $(event.target).attr("data-id");
    $.ajax({
        method: "PUT",
        url: `/api/myentry/${id}`,
        data: wellness,
    }).then((res) => {
        window.location.replace("/myentry");
    });
}

const deleteWellness = async (event) => {

    event.preventDefault();
    const id = $(event.target).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/api/myentry/" + id,
    }).then(() => {
        window.location.replace("/myentry");
    });
}

$("#wellness-edit-btn").on("click", editWellness);
$("#wellness-delete-btn").on("click", deleteWellness);
