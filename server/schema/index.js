export default `
    directive @isAuthenticated on QUERY | FIELD
    directive @hasScope(scope: [String]) on QUERY | FIELD
    directive @mongoDateConverter on FIELD_DEFINITION | FIELD

    scalar DateTime
    scalar NonPositiveInt
    scalar PositiveInt
    scalar NonNegativeInt
    scalar NegativeInt
    scalar NonPositiveFloat
    scalar PositiveFloat
    scalar NonNegativeFloat
    scalar NegativeFloat
    scalar EmailAddress
    scalar URL

    type User {
        _id: String
        username: String
        token: String
        insertedAt: DateTime @mongoDateConverter
        insertedBy: String
        updatedAt: DateTime @mongoDateConverter
        updatedBy: String
        isDeleted: Boolean
    }

    type Project {
        _id: String
        name: String
        description: String
        ownerId: String
        owner: User
        teams: [ProjectTeam]
        lists: [ProjectList]
        insertedAt: DateTime @mongoDateConverter
        insertedBy: String
        updatedAt: DateTime @mongoDateConverter
        updatedBy: String
        isDeleted: Boolean
        numberOfLists: Int
    }

    type ProjectTeamRole {
        _id: String
        name: String
        insertedAt: DateTime @mongoDateConverter
        insertedBy: String
        updatedAt: DateTime @mongoDateConverter
        updatedBy: String
        isDeleted: Boolean
    }

    type ProjectTeam {
        _id: String
        userId: String
        rolesId: [String]
        projectId: String
        isConfirmed: Boolean
        user: User
        roles: [ProjectTeamRole]
        project: Project
        insertedAt: DateTime @mongoDateConverter
        insertedBy: String
        updatedAt: DateTime @mongoDateConverter
        updatedBy: String
        isDeleted: Boolean
    }

    type ProjectList {
        _id: String
        name: String
        projectId: String
        project: Project
        insertedAt: DateTime @mongoDateConverter
        insertedBy: String
        updatedAt: DateTime @mongoDateConverter
        updatedBy: String
        isDeleted: Boolean
    }

    type ProjectListItem {
        _id: String
        title: String
        description: String
        projectListId: String
        state: WorkflowState
        insertedAt: DateTime @mongoDateConverter
        insertedBy: String
        updatedAt: DateTime @mongoDateConverter
        updatedBy: String
        isDeleted: Boolean
    }

    type WorkflowInstance {
        _id: String
        recordId: String
        workflowStateId: String
        workflowConfigurationId: String
        insertedAt: DateTime @mongoDateConverter
        insertedBy: String
        updatedAt: DateTime @mongoDateConverter
        updatedBy: String
        isDeleted: Boolean
    }

    type WorkflowConfiguration {
        _id: String
        name: String
        workflowSettingId: String
        insertedAt: DateTime @mongoDateConverter
        insertedBy: String
        updatedAt: DateTime @mongoDateConverter
        updatedBy: String
        isDeleted: Boolean
    }

    type WorkflowSetting {
        name: String
    }

    type WorkflowState {
        _id: String
        status: String
        insertedAt: DateTime @mongoDateConverter
        insertedBy: String
        updatedAt: DateTime @mongoDateConverter
        updatedBy: String
        isDeleted: Boolean
    }

    type Query {
        currentUser: User @isAuthenticated
        currentUserProjects: [Project] @isAuthenticated
        currentProject(_id: String): Project @isAuthenticated
        searchUsers(queryString: String, limit: Int, exclude: [String]): [User] @isAuthenticated
        getAllRoles: [ProjectTeamRole] @isAuthenticated
        allWorkflowSetting: [WorkflowSetting]
    }

    type Mutation {
        signup(username: String, password: String): User
        login(username: String, password: String): User
        createProject(name: String, description: String): Boolean @isAuthenticated
        createProjectTeamRole(name:String): Boolean @isAuthenticated
        createList(name: String, _id: String): ProjectList @isAuthenticated
        addUserAndRoles(projectId: String, userId: String, rolesId: [String]): Boolean @isAuthenticated
    }

    schema {
        query: Query
        mutation: Mutation
    }
`