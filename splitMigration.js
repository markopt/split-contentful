module.exports = migration => {
  const splitTreatmentItem = migration
    .createContentType("splitTreatmentItem")
    .name("Split Treatment Item")
    .description("A Split treatment item linked by a Split Item ")

  splitTreatmentItem.createField("treatmentName", {
    name: "Treatment Name",
    type: "Symbol",
    required: true
  })

  splitTreatmentItem.changeFieldControl(
    "treatmentName",
    "builtin",
    "singleLine",
    {
      helpText: "The treatment name configured on Split (must be the same)"
    }
  )

  splitTreatmentItem.displayField("treatmentName")

  splitTreatmentItem.createField("item", {
    name: "Item",
    type: "Link",
    linkType: "Entry"
    // validations: [
    //   {
    //     linkContentType: ['image', 'youtubeVideo', 'hero', 'addon'],
    //   },
    // ],
  })

  const splitItem = migration
    .createContentType("splitItem")
    .name("Split Item ")
    .description("An item to support AB testing with Split")

  splitItem.createField("featureFlag", {
    name: "Feature Flag",
    type: "Symbol",
    required: true
  })

  splitItem.displayField("featureFlag")

  splitItem.changeFieldControl("featureFlag", "builtin", "singleLine", {
    helpText: "The feature flag name configured on Split (must be the same)"
  })

  splitItem.createField("defaultItem", {
    name: "Default Item",
    type: "Link",
    linkType: "Entry",
    // validations: [
    //   {
    //     linkContentType: ['image', 'youtubeVideo', 'hero', 'addon'],
    //   },
    // ],
    required: true
  })

  splitItem.createField("treatmentItems", {
    name: "Treatment Items",
    type: "Array",
    items: {
      type: "Link",
      linkType: "Entry"
      // validations: [
      //   {
      //     linkContentType: ['splitTreatmentItem'],
      //   },
      // ],
    }
  })
};
// export {}
