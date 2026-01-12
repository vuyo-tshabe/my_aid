const CONTACT_KEY = 'emergency_contacts';
const MEDICAL_KEY = 'medical_info';

function getContacts() {
  return JSON.parse(localStorage.getItem(CONTACT_KEY)) || [];
}

function saveContacts(contacts) {
  localStorage.setItem(CONTACT_KEY, JSON.stringify(contacts));
}

function addContact() {
  const name = contactName.value.trim();
  const relation = contactRelation.value.trim();
  const phone = contactPhone.value.trim();

  if (!name || !phone) {
    alert('Name and phone are required');
    return;
  }

  const contacts = getContacts();
  contacts.push({ name, relation, phone });
  saveContacts(contacts);

  contactName.value = '';
  contactRelation.value = '';
  contactPhone.value = '';

  renderContacts();
}

function renderContacts() {
  const list = document.getElementById('contactList');
  const searchValue = search.value.toLowerCase();
  const contacts = getContacts();

  list.innerHTML = '';

  contacts
    .filter(c => c.name.toLowerCase().includes(searchValue))
    .forEach((contact, index) => {
      const div = document.createElement('div');
      div.className = 'contact';
      div.innerHTML = `
        <strong>${contact.name}</strong> (${contact.relation || 'N/A'})<br>
        <a href="tel:${contact.phone}">${contact.phone}</a><br>
        <button onclick="removeContact(${index})">Remove</button>
      `;
      list.appendChild(div);
    });
}

function removeContact(index) {
  const contacts = getContacts();
  contacts.splice(index, 1);
  saveContacts(contacts);
  renderContacts();
}

function callPrimaryContact() {
  const contacts = getContacts();
  if (contacts.length === 0) {
    alert('No emergency contacts available');
    return;
  }
  window.location.href = `tel:${contacts[0].phone}`;
}

function saveMedicalInfo() {
  const info = {
    bloodType: bloodType.value,
    allergies: allergies.value,
    medications: medications.value,
    conditions: conditions.value
  };
  localStorage.setItem(MEDICAL_KEY, JSON.stringify(info));
  alert('Medical information saved');
}

function loadMedicalInfo() {
  const info = JSON.parse(localStorage.getItem(MEDICAL_KEY));
  if (!info) return;

  bloodType.value = info.bloodType || '';
  allergies.value = info.allergies || '';
  medications.value = info.medications || '';
  conditions.value = info.conditions || '';
}

loadMedicalInfo();
renderContacts();
