

const insertNewJob = async (name, organization, location, qualification, imageUrl) => {
    const res = await fetch('/insert/job', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, organization, location, qualification, imageUrl}),
    });
    const body = await res.json();
    const success = body.success;
    return success;
};

const onSubmitNewJob = async () => {
    let name, organization, location, qualification, imageUrl;
    try {
        name = document.getElementById('name').value;
        organization = document.getElementById('organization').value;
        location = document.getElementById('location').value;
        qualification = document.getElementById('qualification').value;
        imageUrl = document.getElementById('imageUrl').value;
    } catch (err) {
        console.log(err);
        return;
    }
    const success = await insertNewJob(name, organization, location, qualification, imageUrl);
    alert('Successfully inserted new job: ' + success);
}