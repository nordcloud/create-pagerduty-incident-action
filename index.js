// const core = require('@actions/core');
// const github = require('@actions/github');
// const pd = require('@pagerduty/pdjs');

// const main = async () => {
//     try {
//         const githubContext = github.context.payload;
//         const action = core.getInput('action');
//         const timestamp = core.getInput('timestamp') ?? Date.now().toISOString();
//         const payload = core.getInput('custom_details') ?? {};

//         const response = await pd.event({
//             data: {
//                 routing_key: core.getInput('integration_key'),
//                 event_action: action,
//                 dedup_key: core.getInput('dedup_key') ?? undefined,
//                 payload: action != 'trigger' ? undefined : {
//                     summary: core.getInput('summary'),
//                     source: core.getInput('source'),
//                     severity: core.getInput('severity'),
//                     timestamp: timestamp,
//                     component: core.getInput('component') ?? undefined,
//                     group: core.getInput('group') ?? undefined,
//                     class: core.getInput('class') ?? undefined,
//                     custom_details: {
//                         github_context: githubContext,
//                         ...payload
//                     }
//                 }
//             }
//         });

//         core.setOutput('status', response.status);
//         core.setOutput('message', response.message);

//         console.log('Events API response', response);
//     } catch (error) {
//         core.setFailed(error.message);
//     }
// };

// main();


console.log('Platform: ', process.platform);
console.log('Node version: ', process.version);
console.log('Node dependencies: ', process.versions);
console.log('Process: ', process);
