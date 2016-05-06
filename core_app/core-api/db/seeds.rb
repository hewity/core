tags = Tag.create([
  {post:"I need a recommendation for a good immigration attorney", link:"http://shakillaw.com"},
  {post:"My family is new to the area and lookin for a safe neighborhood", link:"http://www.neighborhoodinfodc.org"},
  {post:"Can anyone recommend a good family doctor?", link:"https://www.us-immigration.com/Doctors-list/districtOfColumbia.jsp"}
  ])

links = Link.create([
  {topic:"Medical Care", about:"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus mollis interdum velit, quis venenatis urna. Maecenas posuere nulla id felis fermentum posuere. Phasellus nec leo ipsum. Fusce tempus leo eu nulla viverra tincidunt. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vulputate blandit scelerisque."},
  {topic:"Immigration", about:"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus mollis interdum velit, quis venenatis urna. Maecenas posuere nulla id felis fermentum posuere. Phasellus nec leo ipsum. Fusce tempus leo eu nulla viverra tincidunt. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vulputate blandit scelerisque."},
  {topic:"Housing", about:"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus mollis interdum velit, quis venenatis urna. Maecenas posuere nulla id felis fermentum posuere. Phasellus nec leo ipsum. Fusce tempus leo eu nulla viverra tincidunt. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vulputate blandit scelerisque."}
  ])

posts = Post.create([
  {body:"I found a good doctor", topic:"Medical Care", location:"Woodbridge, VA"},
  {body:"I got great legal advice", topic:"Immigration", location:"Washington, DC"},
  {body:"I found cheap rent through this agent", topic:"Housing", location:"Langley Park, MD"}
  ])
