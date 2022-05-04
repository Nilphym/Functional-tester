import { belongsTo, hasMany, Model } from 'miragejs';

export const models = {
  project: Model.extend({
    bugs: hasMany(),
    users: hasMany(),
    invitations: hasMany()
  }),
  invitation: Model.extend({
    project: belongsTo()
  }),
  user: Model.extend({
    project: belongsTo(),
    bugs: hasMany()
  }),
  testPlan: Model.extend({
    project: belongsTo(),
    testCategories: hasMany()
  }),
  testCategory: Model.extend({
    testPlan: belongsTo(),
    tests: hasMany(),
    project: belongsTo()
  }),
  test: Model.extend({
    testCategory: belongsTo(),
    steps: hasMany()
  }),
  step: Model.extend({
    test: belongsTo(),
    bugs: hasMany()
  }),
  bug: Model.extend({
    step: belongsTo(),
    project: belongsTo(),
    attachments: hasMany(),
    developer: belongsTo('user')
  }),
  attachment: Model.extend({
    bug: belongsTo()
  })
};
