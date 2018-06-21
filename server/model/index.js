import {Model} from 'mongorito'

export class User extends Model {
    collection() {
			return 'users';
		}	
}
export class Project extends Model {
    collection() {
			return 'projects';
		}
}
export class ProjectTeamRole extends Model {
    collection() {
			return 'projectTeamRoles';
		}
}
export class ProjectTeam extends Model {
    collection() {
			return 'projectTeams';
		}
}
export class ProjectList extends Model {
    collection() {
			return 'projectLists';
		}
}
export class ProjectListItem extends Model {
    collection() {
			return 'projectListItems';
		}
}
export class WorkflowInstance extends Model {
    collection() {
			return 'workflowInstances';
		}
}
export class WorkflowConfiguration extends Model {
    collection() {
			return 'workflowConfigurations';
		}
}
export class WorkflowState extends Model {
    collection() {
			return 'workflowStates';
		}
}
export class WorkflowHandler extends Model {
    collection() {
			return 'workflowHandlers';
		}
}