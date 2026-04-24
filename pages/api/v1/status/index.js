function status(request, response) {
  response.status(200).json({ 200: "tudo certo por aqui" });
}

export default status;
