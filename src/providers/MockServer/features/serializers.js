import { RestSerializer } from 'miragejs';

export const serializers = {
  project: RestSerializer.extend({
    root: false,
    include: ['bugs', 'users'],
    embed: true
  }),
  user: RestSerializer.extend({
    root: false,
    embed: true
  }),
  testPlan: RestSerializer.extend({
    root: false,
    include: ['testCategories'],
    embed: true
  }),
  testCategory: RestSerializer.extend({
    root: false,
    include: ['tests'],
    embed: true
  }),
  test: RestSerializer.extend({
    root: false,
    include: ['steps'],
    embed: true
  }),
  step: RestSerializer.extend({
    root: false,
    include: ['bugs'],
    embed: true
  }),
  bug: RestSerializer.extend({
    root: false,
    include: ['attachments', 'developer'],
    embed: true
  }),
  attachment: RestSerializer.extend({
    root: false,
    embed: true
  })
};
