import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
      appBar: AppBar(
        title: Text('FlutterApp'),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          Image(image: AssetImage('assets/200.png')),
          Column(children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: List.generate(2, (index) {
                return RaisedButton(
                  onPressed: () {},
                  child: Text("Button"),
                );
              }),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: List.generate(2, (index) {
                return RaisedButton(
                  onPressed: () {},
                  child: Text("Button"),
                );
              }),
            )
          ]),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              Flexible(
                flex: 1,
                child: Text(
                  "Email:",
                ),
              ),
              Flexible(
                flex: 2,
                child: TextField(
                  decoration: InputDecoration(hintText: "larsa.mail@live.nu"),
                ),
              )
            ],
          )
        ],
      ),
    ));
  }
}
