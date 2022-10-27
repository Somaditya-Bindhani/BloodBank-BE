const rules = {
  organization: {
    createOrganization: [
      { role: "superAdmin", access: true },
      { role: "orgAdmin", access: false },
    ],
    "": [
      { role: "superAdmin", access: true },
      { role: "orgAdmin", access: true },
    ],
    getOrganization: [
      { role: "superAdmin", access: true },
      { role: "orgAdmin", access: true },
    ],
    addBloodData: [
      { role: "superAdmin", access: true },
      { role: "orgAdmin", access: true },
    ],
    updateBloodData: [
      { role: "superAdmin", access: true },
      { role: "orgAdmin", access: true },
    ],
    updateOrganization: [
      { role: "superAdmin", access: true },
      { role: "orgAdmin", access: true },
    ],
    deleteOrganization: [
      { role: "superAdmin", access: true },
      { role: "orgAdmin", access: true },
    ],
  },
  orgAdmin: {
    createOrgAdmin: [
      { role: "superAdmin", access: true },
      { role: "orgAdmin", access: false },
    ],
    resetPassword: [
      { role: "superAdmin", access: false },
      { role: "orgAdmin", access: true },
    ],
  },
};
module.exports = rules;
