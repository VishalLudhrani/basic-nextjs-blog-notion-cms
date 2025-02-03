export default async (req, context) => {
  console.log("\nSubmission created\n-----req-----\n" + JSON.stringify(req) + "\n-----context-----\n" + JSON.stringify(context))
  console.log("\nparams\n", JSON.stringify(context.params))
  return new Response("Submission created\n-----req-----" + JSON.stringify(req) + "\n-----context-----\n" + JSON.stringify(context))
}

// export const config = {
//   path: ["/posts", "/posts/:slug"]
// }