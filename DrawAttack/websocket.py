#!/usr/bin/env python
#encoding:utf-8

import tornado.ioloop
import tornado.web
import tornado.websocket

class EchoWebSocket(tornado.websocket.WebSocketHandler):
	users = set()
	globalUserCount = 0

	def open(self):
		EchoWebSocket.users.add(self)
		#if-slif循环为了使第六个人上线时广播“人齐了”
		if EchoWebSocket.globalUserCount < 5 and EchoWebSocket.globalUserCount != -1:
			EchoWebSocket.globalUserCount = EchoWebSocket.globalUserCount+1
		elif EchoWebSocket.globalUserCount == 5:
			EchoWebSocket.on_message(self,u"star6$}")
			EchoWebSocket.globalUserCount = -1
		print "WebSocket opened "+str(EchoWebSocket.globalUserCount)

	def on_message(self, message):
		for user in EchoWebSocket.users:
			user.write_message(u"You said: " + message)
				

	def on_close(self):
		EchoWebSocket.users.remove(self)
		if EchoWebSocket.globalUserCount < 5 and EchoWebSocket.globalUserCount != -1:
			EchoWebSocket.globalUserCount = EchoWebSocket.globalUserCount-1
		print "WebSocket closed "+str(EchoWebSocket.globalUserCount)

application = tornado.web.Application([
	(r"/websocket", EchoWebSocket),
])

if __name__ == "__main__":
	application.listen(8000)
	tornado.ioloop.IOLoop.instance().start()
