export default async function helloWorld(req, context) {
  return new Response("Submission created\n-----req-----" + JSON.stringify(req) + "\n-----context-----\n" + JSON.stringify(context))
}