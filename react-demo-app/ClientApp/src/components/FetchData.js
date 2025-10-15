import React, { Component } from 'react';
import { Stack, IStackTokens } from '@fluentui/react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { NormalPeoplePicker } from '@fluentui/react/lib/Pickers';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import axios from 'axios';
import Login from './Login';

const tenantId = "a3b09b39-59ab-407c-ad97-dbecca421780";
const clientId = "caac7aff-dcda-438d-95a5-c625e090e551";
const clientSecret = "fQK8Q~bEtER9DCEE0edCCZIfvpPYaOaeLb3DfaI3";

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { 
      graphUsers: [],
      loadingGraph: true,
      accessToken: '',
      loadingToken: false,
      msGraphUsers: [],
      loadingMsGraph: false,
      searchText: '',
      selectedUsers: [],
      userTeams: {}, // { [userEmail]: [teams] }
      loadingTeams: false,
      teamMembers: {}, // { [teamId]: [members] }
      teamOwners: {},  // { [teamId]: [owners] }
    };
  }

  componentDidMount() {
    //grab access token on load
    this.getAccessToken();

   // this.populateGraphUsers();
  }

  static renderGraphUsersTable(users) {
    return (
     <p></p>
    );
  }

  renderTeamsTable(teams, userKey) {
    if (!teams || teams.length === 0) {
      return <p>No teams found.</p>;
    }
    return (
      <table style={{ marginTop: 16, width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Team ID</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Display Name</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Members</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Owners</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => {
            const members = (this.state.teamMembers?.[team.id] || []);
            const owners = (this.state.teamOwners?.[team.id] || []);
            return (
              <tr key={team.id}>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>{team.id}</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>{team.displayName}</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>
                  {members.length} 
                  {members.length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      {members.map(m => <li key={m.id}>{m.displayName}</li>)}
                    </ul>
                  )}
                </td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>
                  {owners.length}
                  {owners.length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      {owners.map(o => <li key={o.id}>{o.displayName}</li>)}
                    </ul>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    let graphContents = this.state.loadingGraph
      ? <p><em>Loading Graph users...</em></p>
      : FetchData.renderGraphUsersTable(this.state.graphUsers);

    return (
      <div>
        <Login />
        <p style={{display:"none"}}>
        <h1 id="graphUsersLabel">GRAPH users</h1>
        {graphContents}
        <PrimaryButton onClick={() => this.getAccessToken()} disabled={this.state.loadingToken}>
          {this.state.loadingToken ? 'Loading...' : 'Get Access Token'}
        </PrimaryButton>
        {this.state.accessToken && (
          <div>
            <strong>Access Token:</strong>
            <pre style={{wordBreak: 'break-all'}}>{this.state.accessToken}</pre>
            <button onClick={() => this.getMsGraphUsers()} disabled={this.state.loadingMsGraph || !this.state.accessToken}>
              {this.state.loadingMsGraph ? 'Loading Users...' : 'Get Users from Graph API'}
            </button>
          </div>
        )}
        </p>
        {this.state.msGraphUsers.length > 0 && (
          <div>
            <h2>Search User :</h2>
            <NormalPeoplePicker
              onResolveSuggestions={this._onFilterChanged}
              getTextFromItem={item => item.text}
              pickerSuggestionsProps={{
                suggestionsHeaderText: 'Suggested People',
                noResultsFoundText: 'No users found',
              }}
              onChange={this._onPickerChange}
              inputProps={{ placeholder: 'Search users...' }}
              selectedItems={this.state.selectedUsers}
            />
            {/* Display selected users as Persona below the picker */}
            <div style={{ marginTop: 16 }}>
              {this.state.selectedUsers.length > 0 && <h3>Selected Users : </h3>}
              {this.state.selectedUsers.map(user => (
                <Persona
                  key={user.key}
                  text={user.text}
                  secondaryText={user.secondaryText}
                  size={PersonaSize.size72}
                  style={{ marginBottom: 8 }}
                />
              ))}
            </div>
            {/* Teams Table for each selected user */}
            {this.state.selectedUsers.map(user => (
              <div key={user.key + '-teams'}>
                <h4>Teams for {user.text}:</h4>
                {this.state.loadingTeams && this.state.loadingTeams[user.key] ? (
                  <p>Loading teams...</p>
                ) : (
                  this.renderTeamsTable(this.state.userTeams[user.key])
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  _onFilterChanged = (filterText, items) => {
    if (!filterText) {
      return [];
    }
    return this.state.msGraphUsers
      .filter(user =>
        user.displayName.toLowerCase().includes(filterText.toLowerCase()) ||
        (user.mail && user.mail.toLowerCase().includes(filterText.toLowerCase()))
      )
      .map(user => ({
        key: user.id,
        text: user.displayName,
        secondaryText: user.mail
      }));
  };

  _onPickerChange = async (items) => {
    this.setState({ selectedUsers: items || [] });

    if (items && items.length > 0) {
      let userTeams = { ...this.state.userTeams };
      let loadingTeams = {};
      let teamMembers = { ...this.state.teamMembers };
      let teamOwners = { ...this.state.teamOwners };

      for (const user of items) {
        loadingTeams[user.key] = true;
        this.setState({ loadingTeams });

        try {
          // Get teams for user
          const response = await fetch(
            `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(user.secondaryText)}/joinedTeams`,
            {
              headers: {
                Authorization: `Bearer ${this.state.accessToken}`,
              },
            }
          );
          const result = await response.json();
          userTeams[user.key] = result.value || [];

          // For each team, fetch members and owners
          for (const team of userTeams[user.key]) {
            if (!teamMembers[team.id] && !teamOwners[team.id]) {
              // Fetch members
              const membersResponse = await fetch(
                `https://graph.microsoft.com/v1.0/teams/${team.id}/members`,
                {
                  headers: {
                    Authorization: `Bearer ${this.state.accessToken}`,
                  },
                }
              );
              const membersResult = await membersResponse.json();
              teamMembers[team.id] = membersResult.value || [];

              // Fetch owners
              const ownersResponse = await fetch(
                `https://graph.microsoft.com/v1.0/teams/${team.id}/owners`,
                {
                  headers: {
                    Authorization: `Bearer ${this.state.accessToken}`,
                  },
                }
              );
              const ownersResult = await ownersResponse.json();
              teamOwners[team.id] = ownersResult.value || [];
            }
          }
        } catch (error) {
          userTeams[user.key] = [];
        }
        loadingTeams[user.key] = false;
        this.setState({ userTeams, loadingTeams, teamMembers, teamOwners });
      }
    }
  };

  async getMsGraphUsers() {
    this.setState({ loadingMsGraph: true, msGraphUsers: [] });
    try {
      const response = await fetch('https://graph.microsoft.com/v1.0/users', {
        headers: {
          Authorization: `Bearer ${this.state.accessToken}`,
        },
      });
      const result = await response.json();
      // result.value is the array of users
      this.setState({ msGraphUsers: result.value || [], loadingMsGraph: false });
    } catch (error) {
      this.setState({ msGraphUsers: [], loadingMsGraph: false });
    }
  }

  async getAccessToken() {
    this.setState({ loadingToken: true, accessToken: '' });
   
    try {
      const response = await fetch(`/graphtoken/token?clientId=${encodeURIComponent(clientId)}&clientSecret=${encodeURIComponent(clientSecret)}&tenantId=${encodeURIComponent(tenantId)}`);
      const result = await response.json();
      this.setState({ accessToken: result.accessToken || '', loadingToken: false },()=>this.getMsGraphUsers());
    } catch (error) {
      this.setState({ accessToken: 'Error fetching token', loadingToken: false });
    }
  }

  async populateGraphUsers() {
    try {
      const response = await fetch('/graphauth/users');
      const result = await response.json();
      // result is now the array of users from Graph API
      this.setState({ graphUsers: result || [], loadingGraph: false });
    } catch (error) {
      this.setState({ graphUsers: [], loadingGraph: false });
    }
  }
}
