export default async function helloWorld(req, context) {
  console.log("Submission created\n-----req-----" + JSON.stringify(req) + "\n-----context-----\n" + JSON.stringify(context))
  return new Response("Submission created\n-----req-----" + JSON.stringify(req) + "\n-----context-----\n" + JSON.stringify(context))
}