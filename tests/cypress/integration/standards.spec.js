describe("Curriculum Standards", () => {
  it("should select a math standard w/ dropdowns", () => {
    cy.visit("/cc/Math");
    assertFullStandard("Math/3.NF.A.2.a");
  });
  it("should select an ela standard w/ dropdowns", () => {
    cy.visit("/cc/ELA");
    assertFullStandard("ELA/RF.4.3.a");
  });
});

const KEYS = {
  Math: ["Grades", "Domains", "Clusters", "Standards", "Components"],
  ELA: ["Strands", "Grades", "Standards", "Components"]
};

const assertFullStandard = fullCode => {
  const [subject, code] = fullCode.split`/`;
  fullStandard(code).forEach(std => {
    assertStandard(std, subject);
  });
};

const assertStandard = (code, subject) => {
  const stds = code.split`.`;
  const key = KEYS[subject][stds.length - 1];
  const choice = stds.slice(-1)[0];
  const prev = stds.slice(0, -1).join`.`;
  // prev stds selected already?
  if (prev) cy.get(".StdDescription__code").contains(prev);
  // select next std
  cy.get("body")
    .contains(key)
    .parent()
    .select(choice);
  // std code renders
  cy.get(".StdDescription__code").contains(`${subject}/${code}`);
  // std description renders
  cy.get(".StdDescription__text").should("not.be.empty");
};

const fullStandard = code => {
  const stds = code.split`.`;
  return stds.map((_, i) => stds.slice(0, i + 1).join`.`);
};
