workflow "Test" {
  on = "push"
  resolves = ["npm"]
}

action "GitHub Action for npm" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "install"
}

action "npm" {
  uses = "npm"
  needs = ["GitHub Action for npm"]
  runs = "test"
}
