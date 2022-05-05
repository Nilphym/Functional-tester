import React from 'react';

import { BugTable, bugTableTypes } from '../containers';

export const AllBugsPage = () => <BugTable type={bugTableTypes.all} />;
export const AssignedBugsPage = () => <BugTable type={bugTableTypes.assigned} />;
export const ActiveBugsPage = () => <BugTable type={bugTableTypes.active} />;
export const RetestBugsPage = () => <BugTable type={bugTableTypes.toRetest} />;
