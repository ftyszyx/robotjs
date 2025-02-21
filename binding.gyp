{
  # I faced few errors while building the project, so I had to add the following lines to the binding.gyp file (variables)
  "variables": {
    "module_path": "lib/binding",
    "module_name": "robotjs_addon"
  },
  
  "targets": [
    {
      "target_name": "robotjs_addon",
      "include_dirs": [],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').targets\"):node_addon_api"
      ],
      "cflags": [
        "-Wall",
        "-Wparentheses",
        "-Wbad-function-cast",
        "-Wdisabled-optimization"
      ],
      "conditions": [
        ['OS == "mac"',
          {
            "cflags+": [
              "-fvisibility=hidden"
            ],
              'xcode_settings': {
        'GCC_SYMBOLS_PRIVATE_EXTERN': 'YES',
            },
            "include_dirs": [
              "System/Library/Frameworks/CoreFoundation.Framework/Headers",
              "System/Library/Frameworks/Carbon.Framework/Headers",
              "System/Library/Frameworks/ApplicationServices.framework/Headers",
              "System/Library/Frameworks/OpenGL.framework/Headers"
            ],
            "link_settings": {
              "libraries": [
                "-framework Carbon",
                "-framework CoreFoundation",
                "-framework ApplicationServices",
                "-framework OpenGL"
              ]
            }
          }
        ],
        ['OS == "linux"',
          {
            "link_settings": {
              "libraries": [
                "-lpng",
                "-lz",
                "-lX11",
                "-lXtst"
              ]
            },
            "sources": [
              "src/xdisplay.c"
            ]
          }
        ],
        [
          "OS=='win'",
          {
            "defines": [
              "IS_WINDOWS"
            ]
          }
        ]
      ],
      "sources": [
        "src/robotjs.cc",
        "src/deadbeef_rand.c",
        "src/mouse.c",
        "src/keypress.c",
        "src/keycode.c",
        "src/screen.c",
        "src/screengrab.c",
        "src/snprintf.c",
        "src/MMBitmap.c"
      ]
    },
    {
      "target_name": "action_after_build",
      "type": "none",
      "dependencies": [
        "robotjs_addon"
      ],
      "copies": [
        {
          "files": [
            "<(PRODUCT_DIR)/<(module_name).node"
          ],
          "destination": "<(module_path)"
        }
      ]
    }
  ]
}