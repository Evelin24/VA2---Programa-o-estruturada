let data = JSON.parse(localStorage.getItem('crudData')) || [];

function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td class="actions">
                <button class="edit" onclick="editItem(${index})">Editar</button>
                <button class="delete" onclick="deleteItem(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addItem(name, email) {
    data.push({ name, email });
    localStorage.setItem('crudData', JSON.stringify(data));
    renderTable();
}

function editItem(index) {
    const newName = prompt('Novo nome:', data[index].name);
    const newEmail = prompt('Novo email:', data[index].email);

    if (newName && newEmail) {
        data[index] = { name: newName, email: newEmail };
        localStorage.setItem('crudData', JSON.stringify(data));
        renderTable();
    }
}

function deleteItem(index) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
        data.splice(index, 1);
        localStorage.setItem('crudData', JSON.stringify(data));
        renderTable();
    }
}

document.getElementById('crudForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    addItem(name, email);
    this.reset();
});

renderTable();
