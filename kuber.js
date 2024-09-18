import { Kubernetes } from 'k6/x/kubernetes';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

let json = {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: {
        name: "wiley-perf-guild",
        labels: {
            "Created_by": "AusSchoolTeam",
        }
    }
}

const podJson = {
    apiVersion: "v1",
    kind: "Pod",
    metadata: {
        name: "wileyslpod",
        namespace: "wiley-perf-guild",
        labels: {
            "Created_by": "AusSchoolTeam",
        }
    },
    spec: {
        containers: [
            {
                name: "nginx",
                image: "nginx:latest",
                ports: [
                    {
                        containerPort: 80
                    }
                ]
            }
        ]
    }
};

let yaml = `
apiVersion: v1
kind: Namespace
metadata:
  name: yaml-namespace
  labels:
    k6.io/created_by: xk6-kubernetes
`

export default function () {
    const kubernetes = new Kubernetes();

    describe('JSON-based resources', () => {
        const name = json.metadata.name

        let namespace
        describe('Create our Namespace using the JSON definition', () => {
            namespace = kubernetes.create(json)
            console.log(`Namespace created with name: ${namespace.metadata.name}`)
            expect(namespace.metadata, 'new namespace').to.have.property('uid')
        })

        describe('Retrieve all available Namespaces', () => {
            expect(kubernetes.list("Namespace").length, 'total namespaces').to.be.at.least(1)
            console.log(`Total nameespaces found : ${kubernetes.list("Namespace").length}`)
            kubernetes.list("Namespace").forEach(ns => {
                console.log(`Namespace name : ${ns.metadata.name}`)
            }
            )
        })

        describe('Create a Pod in the Namespace',()=>{
            const pod=kubernetes.create(podJson);
            console.log(`Pod created with name : ${pod.metadata.name}`)
        })

        describe('Retrieve our pods in the Namespace', () => {
            expect(kubernetes.list("Pod", "wiley-perf-guild").length, 'total pods').to.be.at.least(1)
            console.log(`Total pods found in the namespace : ${kubernetes.list("Pod", "wiley-perf-guild").length}`)
            kubernetes.list("Pod", "wiley-perf-guild").forEach(pod => {
                console.log(`Pod name : ${pod.metadata.name}`)
            }
            )
        })

        // describe('Remove our Namespace to cleanup', () => {
        //     kubernetes.delete("Namespace", name)
        // })
    })
}