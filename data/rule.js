const rules = {
  organization: {
    createOrganization: [
      { role: superAdmin, access: true },
      { role: orgAdmin, access: false },
    ],
    "/": [
      { role: superAdmin, access: true },
      { role: orgAdmin, access: true },
    ],
    getOrganization: [
      { role: superAdmin, access: true },
      { role: orgAdmin, access: true },
    ],
  },
};
module.exports = rules;
