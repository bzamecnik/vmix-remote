# TODO

- [x] make scene in Program red
- [x] make scheduled scenes orange
- [x] create a stack - Live-Jingle
- [x] create a queue for Jingles
- [x] download the vMix status XML and parse it
  - [x] create UI elements (scenes) from it
  - extract scenes in Preview or Program
  - [ ] integrate with them main app
- create the buttons from the current state
- [x] allow editing the buttons
  - from the set of scenes, allow selecting live and jingle scenes
  - ideally some drap&drop UI
    - eg. http://rubaxa.github.io/Sortable/
  - [ ] integrate with them main app
- save the edited state persistently
  - at least localStorage
  - [x] prototype - a plain file
  - [ ] integrate with them main app
  - [ ] then a back-end database (eg. Python + Mongo)
- run some sequence commands on the backend

## Bugs

- when I click a jingle button again, the scene must not be restarted
- when a jingle is started but no completion arrives, it is locked at this jingle

### Queue operation

- scenario #1
  - queue is empty, nothing is being played back
  - click on a Jingle 1 button
  - enqueue scene 1
  - invoke update()
    - dequeue scene 1
    - restart scene 1
    - CutDirect scene 1
    - scene 1 is not live ->
    - wait for completion on -1 (Program)
    - invoke update()
       - nothing is dequeued, stop
- scenario #2
  - queue is not empty, there's some live scene
  - click on a Jingle 1 button
  - enqueue scene 1
  - invoke update()
    - in Program is something live -> ok
    - dequeue scene 1
    - restart scene 1
    - CutDirect scene 1
    - scene 1 is not live ->
    - wait for completion on -1 (Program)
    - invoke update()
      - dequeue live, cut direct to it
- scenario #3
  - queue is not empty, there's a live scene and some jingle
  - click on Jingle 2 button
  - enqueue scene 2
  - invoke update()
    - scene 1 (jingle) is in Program
    - we'll wait for it to complete, stop
