const core = require('@actions/core');
const github = require('@actions/github');
const pd = require('@pagerduty/pdjs');

const main = async () => {
    try {
        const githubContext = github.context.payload;
        const action = core.getInput('action');
        const timestamp = core.getInput('timestamp') || new Date().toISOString();
        const custom = core.getInput('custom_details') || null;

        const event = {
            data: {
                routing_key: core.getInput('integration_key'),
                event_action: action,
                dedup_key: core.getInput('dedup_key') || undefined,
                payload: action != 'trigger' ? undefined : {
                    summary: core.getInput('summary'),
                    source: core.getInput('source'),
                    severity: core.getInput('severity'),
                    timestamp: timestamp,
                    component: core.getInput('component') || undefined,
                    group: core.getInput('group') || undefined,
                    class: core.getInput('class') || undefined,
                    custom_details: {
                        github_context: core.getInput('include_github_context') == 'true' ? githubContext : undefined,
                        custom: custom || undefined
                    }
                }
            }
        };

        const response = await pd.event(event);

        core.setOutput('status', response.data.status);
        core.setOutput('message', response.data.message);
        core.setOutput('data', response.data);

        console.log('Events API request', JSON.stringify(event));
        console.log('Events API response status', response.status);
        console.log('Events API response data', response.data);

        if (response.status >= 400) {
            core.setFailed(JSON.stringify(response.data));
            return;
        }
    } catch (error) {
        core.setFailed(error.message);
        return;
    }
};

main();
