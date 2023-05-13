Issues
======

.. code-block:: python

    import json
    
    with open('example.json', 'r') as f:
        data = json.loads(f.read())
    print(data)